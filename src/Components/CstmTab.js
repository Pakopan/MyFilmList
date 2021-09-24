import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
import { Button } from 'reactstrap';

export default function CstmTab({activeTab, toggle, firstTabLabel, secondTabLabel, contentTab1="", contentTab2=""}) {
  

  
    return (
        <div>
        <Nav tabs>
          <NavItem>
            <Button color={`${activeTab==="1"?"dark":"white"} `}
              className={`${classnames({ active: activeTab === '1' })} border border-dark`}
              onClick={() => { toggle('1'); }}>
              <h1>{firstTabLabel}</h1>
            </Button>
          </NavItem>
          <NavItem>
            <Button color={`${activeTab==="2"?"dark":"white"}`}
              className={`${classnames({ active: activeTab === '2' })} border border-dark`}
              onClick={() => { toggle('2'); }}
            >
              <h1>{secondTabLabel}</h1>
            </Button>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} className="border border-dark">
          <TabPane tabId="1">
              <div className="row">
                {contentTab1}
              </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="row">
                {contentTab2}
              </div>
          </TabPane>
        </TabContent>
      </div>
    )
}
