import Head from 'next/head'
import styles from '../../styles/TeamListView.module.css'
import { Prisma, PrismaClient, User } from '@prisma/client'
import Header from "../../components/Header";
import { FormEvent, useState } from "react";
import Modal from "../../components/Modal";

/* TODO: Not pixel-perfect solution */

interface HomeProps {
    user: UsersWithOrganization,
    usersOfOrganization: User[]
}

async function getUserWithOrganization(id: number) {
    const prisma = new PrismaClient()
    return await prisma.user.findFirst(
        {
            where: {
                id
            },
            include: {
                organization: true,
            },
        }
    )
}

type UsersWithOrganization = Prisma.PromiseReturnType<typeof getUserWithOrganization>

export async function getServerSideProps(context) {
    const {id} = context.params;

    const prisma = new PrismaClient()
    const user = await getUserWithOrganization(Number.parseInt(id))

    if (!user || user.role !== 'ADMIN') {
        return {
            redirect: {
                permanent: false,
                destination: "/dummy",
            },
        };
    }

    const usersOfOrganization: User[] = await prisma.user.findMany(
        {
            where: {
                organizationId: user.organizationId,
                NOT: {
                    id: user.id
                }
            },
        }
    )

    return {
        props: {
            id,
            user,
            usersOfOrganization
        } as HomeProps
    }
}

export default function TeamListView({user, usersOfOrganization}: HomeProps) {
    const [users, setUsers] = useState(usersOfOrganization)
    const [showModal, setShowModal] = useState(false)

    async function createUser(event: FormEvent) {
        event.preventDefault();

        const fields = Array.prototype.slice.call(event.target)
            .filter(el => el.name)
            .reduce((form, el) => ({
                ...form,
                [el.name]: el.value,
            }), {})

        const response = await fetch(`/api/users/${ user.id }`, {
            method: 'POST',
            body: JSON.stringify({
                ...fields,
                organizationId: user.organizationId,
            })
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const newUser = await response.json() as User
        setUsers([...users, newUser])
        setShowModal(false)
        alert('Success!')
    }

    async function deleteUser(user) {
        const response = await fetch(`/api/users/${ user.id }`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        setUsers(users.filter(u => u.id !== user.id))
        alert('Success!')
    }

    /* TODO:
        Role options are hardcoded
        Split form into different component
        Separation of business logic of this view into controller
        Separation of server side business logic into separated controller
        Verify typescript typehints
        Duplicated role select element; probably a good component candidate
        Replace alert(...) with real toast/notification
     */

    return (
        <div className={ styles.container }>
            <Head>
                <title>Techtorch admin panel</title>
                <meta name="description" content="Coding test for TechTorch"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Header organizationName={ user.organization.name }/>

            <Modal
                show={ showModal }
                onClose={ () => setShowModal(false) }
                actionButtonText="Add team member"
                formId={ "create_member_form" }
            >
                <div>
                    <h2>Invite team members</h2>

                    <form onSubmit={ (e) => createUser(e) } id="create_member_form">
                        <label htmlFor="email">Email address *</label><br/>
                        <input type="email" id="email" name="email" required/><br/><br/>

                        <label htmlFor="name">Name *</label><br/>
                        <input type="text" id="name" name="name" required/><br/><br/>

                        <label htmlFor="create_user_role">Select role *</label><br/>
                        <select name="role" id="create_user_role" required>
                            <option value="ADMIN">ADMIN</option>
                            <option value="EDITOR">EDITOR</option>
                            <option value="VIEWER">VIEWER</option>
                        </select>
                    </form>
                </div>
            </Modal>

            <main className={ styles.main }>
                <div className={ styles.top }>
                    <section>
                        <h3>Team</h3>
                        <span>Invite team members and assign organization roles</span>
                    </section>
                    <section>
                        <button onClick={ () => setShowModal(true) }>
                            Add team member
                        </button>
                    </section>
                </div>

                {/* A Grid can be another approach */ }
                {
                    users.length <= 0 ? 'No team members' :
                        <ul className={ styles.list }>
                            <li>
                                <h3>Team member</h3>
                                <h3>Role</h3>
                            </li>
                            { users.map(user =>
                                (
                                    <li key={ user.id }>
                                        <section className={ styles.member }>
                                            <img
                                                src="https://avatars.githubusercontent.com/u/861540"
                                                alt="Team member image"
                                                height={ 40 }
                                                width={ 40 }
                                            />
                                            <div className={ styles.userDetails }>
                                                <h3>{ user.name }</h3>
                                                <span>{ user.email }</span>
                                            </div>
                                        </section>
                                        <section className={ styles.role }>
                                            { /*Select is disabled because updating the role is not part of the test*/ }
                                            <select disabled name="role" id="role" value={ user.role }
                                                    onChange={ () => null }>
                                                <option value="ADMIN">ADMIN</option>
                                                <option value="EDITOR">EDITOR</option>
                                                <option value="VIEWER">VIEWER</option>
                                            </select>
                                            <button onClick={ () => deleteUser(user) }>Delete</button>
                                        </section>
                                    </li>
                                )
                            ) }
                        </ul>
                }
            </main>
        </div>
    )
}
