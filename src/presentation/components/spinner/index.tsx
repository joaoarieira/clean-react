import Styles from './styles.module.scss';

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function Spinner({ className, ...props }: Props) {
  return (
    <div {...props} className={`${Styles['lds-dual-ring']} ${className}`} />
  );
}
