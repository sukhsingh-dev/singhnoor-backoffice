interface IconType {
  name: string
  className?: string
  width?: number
  height?: number
}

const Icon: React.FC<IconType> = ({ width = 16, height = 16, name, className = '' }: IconType) => (
  <svg width={width} height={height} className={`icon ${className}`}>
    <use href={`/icons/sprite.svg#${name}`} />
  </svg>
)

export default Icon
