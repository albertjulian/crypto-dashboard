import Layout from "@/components/Layout"
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import AccessibleTable from "@/components/Table"
import { Alert, Button, Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";

const Portofolio = ({ profileData, setProfileData, setNotifMessage }) => {
  const router = useRouter();
  const [tabPanel, setTabPanel] = useState(0);
  const header = [
    {
      id: 'symbol',
      label: 'Coin',
      align: 'left'
    },
    {
      id: 'price',
      label: 'Avg. Price'
    },
    {
      id: 'volume',
      label: 'Volume'
    },
    {
      id: 'total',
      label: 'Total'
    }
  ];

  const headerOrder = [
    {
      id: 'symbol',
      label: 'Coin',
      align: 'left'
    },
    {
      id: 'command',
      label: 'Command',
      align: 'left'
    },
    {
      id: 'status',
      label: 'Status',
      align: 'left'
    },
    {
      id: 'price',
      label: 'Submission Price'
    },
    {
      id: 'price_done',
      label: 'Price Done'
    },
    {
      id: 'volume',
      label: 'Volume'
    },
    {
      id: 'total_done',
      label: 'Total'
    },
    {
      id: 'action',
      label: 'Action'
    }
  ];

  const handleChangeTab = (event, newValue) => {
    setTabPanel(newValue);
  };

  const handleBackToHome = () => {
    router.push('/')
  }

  const handleCancelOrder = (index) => {
    const newProfile = profileData;

    newProfile.order[index].status = 'CANCELED';

    setProfileData(newProfile);

    setNotifMessage(
      <Alert severity="warning">
        {`Cancel Order ${newProfile.order[index].symbol} - Vol(${newProfile.order[index].volume}) Price(Rp ${newProfile.order[index].price})`}
      </Alert>
    )
  }

  return (
    <Layout>
      <div style={{display: "flex", justifyContent:'flex-end'}}>
        <Button onClick={handleBackToHome} color="primary" size="large" variant="contained" startIcon={<ArrowCircleLeftIcon />}>
          Back
        </Button>
      </div>
      <Paper style={{ marginTop: '20px' }}>
        
        <Tabs value={tabPanel} onChange={handleChangeTab} aria-label="basic tabs example">
          <Tab label="My Portofolio" value={0} />
          <Tab label="My Order" value={1} />
        </Tabs>
        <AccessibleTable
          title={tabPanel === 0 ? 'Porto' : 'Order' }
          header={tabPanel === 0 ? header : headerOrder}
          data={tabPanel === 0 ? profileData.porto.filter((row) => row.volume > 0) : profileData.order}
          actionButton={handleCancelOrder}
        />
      </Paper>
    </Layout>
  )
}

export default Portofolio