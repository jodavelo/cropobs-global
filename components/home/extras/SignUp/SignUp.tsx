
import Button from 'react-bootstrap/Button';
import styles from './signup.module.css';


export const SignUp = () => {

    const onSignUp = () => {
        console.log('Ok sign up');
    }

    return (
        <div className={ styles['signup-container'] }>
            <span className={ styles['signup-title'] }>Sign Up</span>
            <span className={ styles['signup-description'] }>Join of our community!</span>
            <Button className={ styles.button } onClick={ onSignUp } variant="primary">Sign Up</Button>
        </div>
    )
}
