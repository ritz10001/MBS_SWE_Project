import { cva, cx } from 'class-variance-authority';
import clsx from 'clsx';
import LoadingCircle from './LoadingCircle';
import { NavLink } from 'react-router';

const styles = cva(
  'transition-colors rounded-md',
  {
    variants: {
      block: {
        default: 'flex items-center',
        true: 'flex items-center w-full',
      },
      justify: {
        default: 'justify-center',
        start: 'justify-start',
        end: 'justify-end',
      },
      disabled: {
        true: 'opacity-60 cursor-not-allowed',
      },
      loading: {
        true: 'opacity-60 cursor-not-allowed',
      },
      variant: {
        default: 'bg-gray-500 hover:bg-gray-600 text-white',
        danger: 'bg-red-600 hover:bg-red-700 text-white',
        success: 'bg-green-600 hover:bg-green-700 text-white',
        primary: 'bg-blue-500 hover:bg-blue-600 text-white',
        action: 'bg-gray-800 hover:bg-gray-800/70 text-white',
        nostyle: '',
      },
      size: {
        small: 'py-1 px-2 font-medium text-xs',
        medium: 'py-2 px-3 font-medium text-sm',
        large: 'py-3 px-4 font-medium text-medium',
      },
      width: {
        full: 'w-full',
        min: 'w-min',
      },
    },
    defaultVariants: {
      size: 'medium',
      variant: 'default',
      block: 'default',
      justify: 'default',
    },
  },
);

export default function Button({ href, icon, ...props }) {
  const Content = href ? 'a' : 'button';
  const Icon = icon;

  const component = (
    <Content
      {...props}
      type={props.type ?? 'button'}
      className={cx(styles(props), props.className)}
      disabled={props.disabled || props.loading}
    >
      {props.loading && <LoadingCircle className={clsx(props.size === 'small' ? 'w-3 h-3' : 'w-5 h-5', props.children && 'mr-2 -ml-1')}/>}
      <div className={cx('flex items-center')}>
        {icon && !props.loading && <Icon className={clsx('h-5 w-5', props.children && 'mr-2 -ml-1')}/>}
        {props.children}
      </div>
    </Content>
  );

  return href ? <NavLink to={href}>{component}</NavLink> : component;
}
