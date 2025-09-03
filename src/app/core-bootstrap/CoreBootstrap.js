import Carousel from '../core-bootstrap/Carousel';
import Accordion from '../core-bootstrap/Accordion';
import Modal from '../core-bootstrap/Modal';
import Spinner from '../core-bootstrap/Spinner';
import Card from './Card';
const CoreBootstrap = () => {
    return (<>
        <Carousel />
        <Card />
        <Accordion />
        <Modal />
        <Spinner />
    </>);
}

export default CoreBootstrap;