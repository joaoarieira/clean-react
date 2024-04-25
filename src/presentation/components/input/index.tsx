import Styles from './styles.module.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Input(props: Props) {
  return (
    <div className={Styles['input-wrapper']}>
      <input {...props} />
      <span className={Styles.status}>🔴</span>
    </div>
  );
}
