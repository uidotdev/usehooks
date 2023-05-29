import styles from './Callout.module.css';

type Props = {
  image: string
  imageWidth: string
  imageHeight: string
  imageAlt: string
  pitch: string
}

export default function Callout({ image, imageWidth, imageHeight, imageAlt, pitch }) {
  return (
    <li className={styles.callout}>
      <a href="https://react.gg" className="logo image">
        <img
          src={ `/img/${image}.svg` }
          width={imageWidth}
          height={imageHeight}
          className={image}
          alt={imageAlt}
        />
        <img
          src="/img/react-gg-logo.svg"
          width="464"
          height="85"
          className="logo"
          alt="React.gg"
        />
        <p>{pitch}</p>
      </a>
    </li>
  )
}