import React, { Children } from 'react';
interface Props {
  iconName: string;
  title?: string;
  color: string;
  className?: string;
  children?: JSX.Element;
}
export default function ItemWithIcon(props: Props) {
  const { iconName, title, color, className, children } = props;
  return (
    <p className="icon-p">
      {children}
      <svg style={{ color: color }} className={className} aria-hidden="true">
        <use xlinkHref={`#icon-${iconName}`}></use>
      </svg>
      {title}
    </p>
  );
}
