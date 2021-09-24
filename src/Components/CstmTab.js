import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';

export default function CstmTab({activeTab, toggle, firstTabLabel, secondTabLabel, contentTab1="", contentTab2=""}) {
  

  
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
            <div className="row">
                {contentTab2}
              </div>
          </TabPane>
        </TabContent>
      </div>
    )
}
