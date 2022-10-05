import {React, useState} from 'react';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router';
// import './styles/aboutStyles.css';
import Sidebar from './Sidebar';
import { DropdownButton, Dropdown, Button, Card, Container, Row, Col, Form, FormLabel } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';


const Docs = (props) => {
  // const [value, setValue] = useState('');
  // const [copied, setCopied] = useState(false);
  
  return(
    <div>
      <Navigation id='navbar'></Navigation> */
      {/* <div>
        <Row>
          <Col>
            <Card style={{ color: '#000', width: '30rem', height: '30rem', right: '10px' }} className='selected-query'>
              <Card.Body>
              
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div> */}
      <p>HIIIII</p>
    </div>
  );
};

// const Docs = withRouter(Dash);
export default Docs;