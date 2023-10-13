/*import React, { useState, useEffect } from 'react';
import { Graph } from 'react-d3-graph';
import { users } from './userData';
const FlowDiagram2 = () => {
  const usersData = users;

  const [data, setData] = useState({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    const newData = {
      nodes: [],
      links: [],
    };

    for (const userKey in usersData) {
      const user = usersData[userKey];
      newData.nodes.push({ id: userKey });

      user.captainBeeRelationShips?.forEach((relationship) => {
        newData.nodes.push({ id: relationship.captainBeeEmail });
        newData.links.push({ source: userKey, target: relationship.captainBeeEmail });
      });

      user.children?.forEach((child, index) => {
        const childKey = `${userKey}-Child${index + 1}`;
        newData.nodes.push({ id: childKey });
        newData.links.push({ source: userKey, target: childKey });
      });
    }

    setData(newData);
  }, [usersData]);

  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: 'lightgreen',
      size: 120,
      highlightStrokeColor: 'blue',
    },
    link: {
      highlightColor: 'lightblue',
    },
  };

  return (
    <div style={{ height: '600px' }}>
      <Graph
        id="graph-id"
        data={data}
        config={myConfig}
      />
    </div>
  );
};

export default FlowDiagram2; */
//Works properly but a ui issues 

import React, { useState, useEffect } from 'react';
import { Graph } from 'react-d3-graph';
import { users } from './userData';

const FlowDiagram2 = () => {
  const usersData = users;

  const [data, setData] = useState({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    const newData = {
      nodes: [],
      links: [],
    };

    const nodeSpacing = 200; // Adjust this value for node spacing
    const levelSpacing = 100; // Adjust this value for level spacing
    const yOffset = 150; // Vertical offset for better positioning

    let level = 0;

    for (const userKey in usersData) {
      const user = usersData[userKey];

      // Check if the user has captainBeeRelationShips
      if (user.captainBeeRelationShips) {
        newData.nodes.push({
          id: userKey,
          color: 'lightblue',
          x: level * nodeSpacing,
          y: level * levelSpacing + yOffset,
        });

        user.captainBeeRelationShips?.forEach((relationship) => {
          const targetId = relationship.captainBeeEmail;
          newData.nodes.push({
            id: targetId,
            color: 'lightgreen',
            x: level * nodeSpacing + nodeSpacing,
            y: level * levelSpacing + yOffset,
          });
          newData.links.push({
            source: userKey,
            target: targetId,
            color: 'gray',
          });
        });

        level++;
      }
    }

    setData(newData);
  }, [usersData]);

  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      highlightFontSize: 12,
    },
    link: {
      highlightColor: 'lightblue',
    },
  };

  return (
    <div style={{ height: '600px' }}>
      <Graph id="graph-id" data={data} config={myConfig} />
    </div>
  );
};

export default FlowDiagram2;
/*
import React, { useState, useEffect } from 'react';
import { Graph } from 'react-d3-graph';
import { users } from './userData';

const FlowDiagram = () => {
  const usersData = users;

  const [data, setData] = useState({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    const newData = {
      nodes: [],
      links: [],
    };

    const emailToNode = {};

    const processUser = (userEmail, parentUserEmail = null) => {
      if (emailToNode[userEmail]) {
        return;
      }

      const user = usersData[userEmail];
      const node = {
        id: userEmail,
        color: 'lightblue',
      };

      emailToNode[userEmail] = node;
      newData.nodes.push(node);

      if (parentUserEmail) {
        newData.links.push({
          source: parentUserEmail,
          target: userEmail,
          color: 'gray',
        });
      }

      const referrals = user?.captainBeeRelationShips || [];

      // Consider both user's referral code and main email
      const referralEmails = referrals.map((relationship) => relationship.captainBeeEmail);
      console.log(referralEmails)
      referralEmails.push(user?.Email || '');

      referralEmails.forEach((targetEmail) => {
        processUser(targetEmail, userEmail);
      });
    };

    // Process all users and their referrals
    for (const userEmail in usersData) {
      processUser(userEmail);
    }

    setData(newData);
  }, [usersData]);

  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      highlightFontSize: 12,
    },
    link: {
      highlightColor: 'lightblue',
    },
  };

  return (
    <div style={{ height: '600px' }}>
      <Graph id="graph-id" data={data} config={myConfig} />
    </div>
  );
};

export default FlowDiagram;
*/