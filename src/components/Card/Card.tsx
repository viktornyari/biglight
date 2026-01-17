import { JSX } from 'preact';

export type CardSize = 'large' | 'small';

export interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {
  size?: CardSize;
  title: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

// User Icon for the button - using the provided SVG
function UserIcon({ className = '' }: { className?: string }) {
  return (
    <div className={`w-3 h-3 relative overflow-hidden ${className}`}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M10 10.5V9.5C10 8.96957 9.78929 8.46086 9.41421 8.08579C9.03914 7.71071 8.53043 7.5 8 7.5H4C3.46957 7.5 2.96086 7.71071 2.58579 8.08579C2.21071 8.46086 2 8.96957 2 9.5V10.5M8 3.5C8 4.60457 7.10457 5.5 6 5.5C4.89543 5.5 4 4.60457 4 3.5C4 2.39543 4.89543 1.5 6 1.5C7.10457 1.5 8 2.39543 8 3.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// Graphic element for the card - using the provided SVG
function CardGraphic({ size = 'large' }: { size?: CardSize }) {
  const dimension = size === 'large' ? 'w-36 h-36' : 'w-20 h-20';
  // Generate unique IDs for each SVG instance to avoid conflicts
  const uniqueId = `card-graphic-${Math.random().toString(36).substr(2, 9)}`;
  const clipId = `clip0_${uniqueId}`;
  const maskId = `path-1-inside-1_${uniqueId}`;
  
  return (
    <div className={`${dimension} relative flex items-center justify-center`}>
      <svg
        width={size === 'large' ? '144' : '80'}
        height={size === 'large' ? '146' : '81'}
        viewBox="0 0 145 146"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <g clipPath={`url(#${clipId})`}>
          <mask id={maskId} fill="white">
            <path d="M0 8C0 3.58173 3.58172 0 8 0H136.413C140.831 0 144.413 3.58172 144.413 8V138C144.413 142.418 140.831 146 136.413 146H7.99999C3.58172 146 0 142.418 0 138V8Z"/>
          </mask>
          <path d="M0 8C0 3.58173 3.58172 0 8 0H136.413C140.831 0 144.413 3.58172 144.413 8V138C144.413 142.418 140.831 146 136.413 146H7.99999C3.58172 146 0 142.418 0 138V8Z" fill="#FAF9F5"/>
          <path d="M1.94922 72.8495H72.1168V143.761L1.94922 72.8495Z" fill="#FC4C02"/>
          <path d="M1.94922 2.67896L72.1168 72.8495M142.284 143.761L72.1168 72.8495M72.1168 72.8495H1.94922L72.1168 143.761V72.8495Z" stroke="black" strokeWidth="1.5"/>
        </g>
        <path d="M8 1.5H136.413V-1.5H8V1.5ZM142.913 8V138H145.913V8H142.913ZM136.413 144.5H7.99999V147.5H136.413V144.5ZM1.5 138V8H-1.5V138H1.5ZM7.99999 144.5C4.41014 144.5 1.5 141.59 1.5 138H-1.5C-1.5 143.247 2.75329 147.5 7.99999 147.5V144.5ZM142.913 138C142.913 141.59 140.003 144.5 136.413 144.5V147.5C141.66 147.5 145.913 143.247 145.913 138H142.913ZM136.413 1.5C140.003 1.5 142.913 4.41015 142.913 8H145.913C145.913 2.7533 141.66 -1.5 136.413 -1.5V1.5ZM8 -1.5C2.75329 -1.5 -1.5 2.7533 -1.5 8H1.5C1.5 4.41015 4.41015 1.5 8 1.5V-1.5Z" fill="black" mask={`url(#${maskId})`}/>
        <defs>
          <clipPath id={clipId}>
            <path d="M0 8C0 3.58173 3.58172 0 8 0H136.413C140.831 0 144.413 3.58172 144.413 8V138C144.413 142.418 140.831 146 136.413 146H7.99999C3.58172 146 0 142.418 0 138V8Z" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export function Card({
  size = 'large',
  title,
  buttonText = 'Join',
  onButtonClick,
  className = '',
  ...props
}: CardProps) {
  const isLarge = size === 'large';
  
  const cardClasses = isLarge
    ? 'w-96 p-6 bg-surface-brand-secondary rounded-[20px] flex justify-start items-start gap-6'
    : 'w-72 h-36 p-4 bg-surface-brand-secondary rounded-[20px] flex justify-start items-start gap-4';
  
  const titleClasses = isLarge
    ? 'self-stretch flex-1 justify-start text-text-action-inverse text-3xl font-medium leading-10'
    : 'self-stretch flex-1 justify-start text-text-action-inverse text-xl font-medium leading-6';
  
  const contentGap = isLarge ? 'gap-8' : 'gap-5';
  
  return (
    <div className={cardClasses}>
      <div className={`flex-1 self-stretch inline-flex flex-col justify-start items-start ${contentGap}`}>
        <div className={titleClasses}>
          {title}
        </div>
        <div className="inline-flex justify-start items-start">
          <button
            onClick={onButtonClick}
            className="px-4 py-3 bg-surface-action-primary rounded-[120px] flex justify-center items-center gap-2 text-text-action-on-primary text-sm font-medium leading-4 hover:bg-surface-action-hover-primary hover:text-text-action-inverse transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary group"
          >
            <UserIcon className="text-icon-action-on-primary group-hover:text-icon-action-inverse transition-colors" />
            <span className="px-2 flex justify-center items-center">{buttonText}</span>
          </button>
        </div>
      </div>
      <CardGraphic size={size} />
    </div>
  );
}

Card.displayName = 'Card';
