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
    link: 'https://drive.google.com/drive/folders/1C1CoOkiK6drVgW9cjQh8aZiHcLX6NJIG?usp=drive_link',
    name: 'Tokenomics',
  },
  {
    id: '2',
    link: 'https://drive.google.com/drive/folders/1v_Av1C73dd6SoQBpKb83HQU0lQgA5Ldv?usp=drive_link',
    name: 'Whitepapers',
  },
];

const CaptainResourceTechnical = () => {
  const [resource] = useState(resourceData);
  const themes = useTheme();
  const isMobile = useMediaQuery(themes.breakpoints.down('md'));

  return (
    <>
      {/* <SubHeader /> */}
      <HiveDashboardIconicHeader />

      <ResourceHeader />
      <div className="hive-container" style={{ paddingTop: '320px' }}>
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
            maxWidth={'400px'}
            rowSpacing={8}
          >
            {resource?.map((item) => (
              <Grid item xs={1} sm={6} md={6}>
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

export default CaptainResourceTechnical;
