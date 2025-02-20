import GoogleIcon from '@web/assets/images/google.svg';
import * as styles from './GoogleLoginButton.css';

type GoogleLoginButtonProps = {
  onClick: () => void;
};

export function GoogleLoginButton({ onClick }: GoogleLoginButtonProps) {
  return (
    <button className={styles.gradientButton} onClick={onClick}>
      <GoogleIcon />
      Google 로그인하기
    </button>
  );
}
