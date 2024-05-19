import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';

interface CustomLinkContainerProps {
    linkName: string;
    to?: string;
}

const CustomLinkContainer = ({ linkName, to = '/' }: CustomLinkContainerProps) => (
    <LinkContainer to={to}>
        <Nav.Link>{ linkName }</Nav.Link>
    </LinkContainer>
);

export default CustomLinkContainer;
