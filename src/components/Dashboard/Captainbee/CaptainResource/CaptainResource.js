import React, { useState } from 'react';
import ResourceHeader from './ResourceHeader/ResourceHeader';
import SubHeader from '../SubHeader/SubHeader';
import { Box, Grid } from '@mui/material';
import './CaptainResource.css';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import HiveDashboardIconicHeader from '../SubHeader/HiveDashboardIconicHeader';

const resourceData = [
  {
    id: '1',
    link: 'https://drive.google.com/drive/folders/1RS8UhIQ6NGyWAat9d_zIKkhjYSZ6qLKq?usp=drive_link',
    name: 'Icons & Graphics',
  },
  {
    id: '2',
    link: 'https://drive.google.com/drive/folders/1DptEHl3DxcJ2xiYP2esNQxK0nKR1FdyU?usp=drive_link',
    name: 'Indexx Tokens',
  },
  {
    id: '3',
    link: 'https://drive.google.com/drive/folders/1oYpa99dlIlXeytsA1VC8e1aN9Z4HhjYg?usp=drive_link',
    name: 'Posters',
  },
  {
    id: '4',
    link: 'https://drive.google.com/drive/folders/1PfnRcGRpN23JObWV3fMzJttN29jk6NJf?usp=drive_link',
    name: 'Videos',
  },
];

const CaptainResource = () => {
  const [resource] = useState(resourceData);
  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));
  const [selectedTab, setSelectedTab] = useState('Resources');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <>
      {/* <SubHeader /> */}
      <HiveDashboardIconicHeader
        selectedTab={selectedTab}
        onChange={handleTabChange}
      />

      {/* <ResourceHeader /> */}
      <div className="hive-container" style={{ marginTop: '320px' }}>
        <Box
          sx={{
            width: `${isMobile ? '90%' : '53%'}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Grid
            container
            columns={{ xs: 2, sm: 12, md: 12 }}
            spacing={{ xs: 1, md: 1 }}
            maxWidth={'1150px'}
            rowSpacing={8}
          >
            {resource?.map((item) => (
              <Grid item xs={1} sm={6} md={3}>
                <div className="d-flex flex-direction-column">
                  <div className="d-flex flex-direction-column align-items-center">
                    <a
                      href={item.link}
                      className="d-flex flex-direction-column align-items-center"
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: '#000' }}
                    >
                      <div className="folder"></div>
                      <div
                        className="font_15x d-flex align-items-center"
                        style={{ color: 'var( --body_color)' }}
                      >
                        {item.name}
                      </div>
                    </a>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default CaptainResource;
