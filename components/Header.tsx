import styles from '../styles/Header.module.css'

interface HeaderProps {
    organizationName: string
}

export default function Header(props: HeaderProps) {
    /* TODO: Use real images/data */
    return (
        <header className={ styles.header }>
            <section className={ styles.left }>
                <img
                    src="https://uploads-ssl.webflow.com/61a623e68a0238678e1d1bbc/61a63c7a3ca045569572ffcf_logo-white.svg"
                    alt="Company logo"
                    height={ 38 }
                    width={ 120 }
                />
                <span><b>{ props.organizationName }</b> / Team</span>
            </section>
            <section className={ styles.right }>
                <button className={ styles.useCaseButton }>
                    Create new use case
                </button>
                <img
                    src="https://www.svgrepo.com/show/207515/notification.svg"
                    alt="Notitication's bell"
                    height={ 30 }
                    width={ 30 }
                />
                <img
                    src="https://github.com/kyryl-bogach.png" alt="User profile image"
                    height={ 30 }
                    width={ 30 }
                />
            </section>
        </header>
    )
}
