import React, {useState} from 'react'
import ResourceHeader from './ResourceHeader/ResourceHeader'
import SubHeader from '../SubHeader/SubHeader'
import { Box, Grid } from '@mui/material';
import './CaptainResource.css'

const resourceData = [
  {
    id: '1',
    link: "https://docs.google.com/document/d/1sxNisTd5Q1sO4Xx5xs5k5n3asRmmMzlYuG0uEBOywSc/edit?usp=drive_link",
    name: 'Terms and Responsibilities',
  },
  {
    id: '2',
    link: "https://docs.google.com/document/d/1HtCd14EaqKQ5TNPVCFMjeUPTSgchyPH8hdLE_tPlrls/edit?usp=drive_link",
    name: 'Rules and Regulations',
  },
  // {
  //   id: '3',
  //   link: "",
  //   name: 'Hive',
  // },
  // {
  //   id: '4',
  //   link: "",
  //   name: 'NFT',
  // },
  // {
  //   id: '5',
  //   link: "",
  //   name: 'Stock Certificate',
  // },
  // {
  //   id: '6',
  //   link: "",
  //   name: 'Stock Token',
  // },
  // {
  //   id: '7',
  //   link: "",
  //   name: 'Wall Street',
  // },
  // {
  //   id: '8',
  //   link: "",
  //   name: 'XNFT',
  // },
];

const CaptainResourceLegal = () => {
  const [resource, setResource] = useState(resourceData)
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

export default CaptainResourceLegal