import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';

export default function CstmTab({firstTabLabel, secondTabLabel, contentTab1}) {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }
  
    return (
        <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={`${classnames({ active: activeTab === '1' })} bg-light`}
              onClick={() => { toggle('1'); }}
            >
              <h1>{firstTabLabel}</h1>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >
              <h1>{secondTabLabel}</h1>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
              <div className="row">
                {contentTab1}
                </div>
          </TabPane>
          <TabPane tabId="2">
            <h1>ini kosong</h1>
          </TabPane>
        </TabContent>
      </div>
    )
}
