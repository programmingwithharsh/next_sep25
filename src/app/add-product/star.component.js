import styles from '../home2.module.scss';

function Star() {
    return (<div>
        <h1>Star Component</h1>
        <div className="container">CSS example using scss
            <h1>Hello SCSS in Next.js</h1>
            <p>This is styles using scss</p>
        </div>

        <div className={styles.container2}>CSS example using scss - Module
            <h1>Hello SCSS in Next.js</h1>
            <p>This is styles using scss</p>
        </div>
    </div>);
}

export default Star;