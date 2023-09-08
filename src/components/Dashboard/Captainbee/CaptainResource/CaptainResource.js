import React, {useState} from 'react'
import ResourceHeader from './ResourceHeader/ResourceHeader'
import SubHeader from '../SubHeader/SubHeader'
import { Box, Grid } from '@mui/material';
import './CaptainResource.css'

const resourceData = [
  {
    id: '1',
    link: "https://drive.google.com/drive/folders/1Trjd54mpaHo8Ziyag5sWhsN0dMZAPlIx?usp=drive_link",
    name: 'Gift Cards',
  },
  {
    id: '2',
    link: "https://drive.google.com/drive/folders/1tchH3-yDWv0d5qrqG-MS9chcrNhX5QZh?usp=drive_link",
    name: 'Greeting Cards',
  },
  {
    id: '3',
    link: "https://drive.google.com/drive/folders/1fGIx1tpYJavXKW19OHCyLSVu3AGqV4MA?usp=drive_link",
    name: 'Hive',
  },
  {
    id: '4',
    link: "https://drive.google.com/drive/folders/1M4Vp7I8-3U2g34lkMUNDUZbRhKflloIW?usp=drive_link",
    name: 'NFT',
  },
  {
    id: '5',
    link: "https://drive.google.com/drive/folders/1BRLXjZBTxacKyQQJFDmu7N15l-SYyeW1?usp=drive_link",
    name: 'Stock Certificate',
  },
  {
    id: '6',
    link: "https://drive.google.com/drive/folders/1MwLdr_X19-JWNjk_svp_kjptiMbKI4kk?usp=drive_link",
    name: 'Stock Token',
  },
  {
    id: '7',
    link: "https://drive.google.com/drive/folders/1wjia-0cXoenHvBxiC-rIZyWjeThMksNv?usp=drive_link",
    name: 'Wall Street',
  },
  {
    id: '8',
    link: "https://drive.google.com/drive/folders/1PxYZhahfeqXeWdVYXezIrxwdp-qvqSxf?usp=drive_link",
    name: 'XNFT',
  },
];

const CaptainResource = () => {
  const [resource, setResource] = useState(resourceData);

  return (
    <>
      <SubHeader />
      <ResourceHeader/>
      <div className="hive-container" style={{paddingTop:"320px"}}>
      <Box
          sx={{
            width: '53%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Grid
            container
            // columns={{ xs: 1, sm: 12, md: 12 }}
            spacing={{ xs: 1, md: 1 }}
            maxWidth={"1150px"}
            rowSpacing={8}
          >
            {resource?.map((item) => (
              <Grid item xs={1} sm={6} md={2} >
                <div className="d-flex flex-direction-column">
                  <div className="d-flex flex-direction-column align-items-center">
                    <a href={item.link} className='d-flex flex-direction-column align-items-center' target='_blank' style={{color:"#000"}}>
                      <div className='folder'>
                      </div>
                      <div className="font_15x d-flex align-items-center">
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
  )
}

export default CaptainResource