import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Button, Alert, Box } from '@mui/material';

import LovePoem from "../src/img/LovePoem.jpg";
import Lilac from "../src/img/Lilac.jpg";
import Palette from "../src/img/Palette.jpg";

function Detail() {
  const { albumId } = useParams();

  let albumTitle, albumSubtitle, albumPrice, albumImage;

  if (albumId === 'love-poem') {
    albumTitle = 'Love poem';
    albumSubtitle = 'The 5th Mini Album';
    albumPrice = '14,000원';
    albumImage = LovePoem;

  } else if (albumId === 'lilac') {
    albumTitle = 'LILAC';
    albumSubtitle = 'The 5th Album';
    albumPrice = '20,000원';
    albumImage = Lilac;

  } else if (albumId === 'palette') {
    albumTitle = 'Palette';
    albumSubtitle = 'The 4th Album';
    albumPrice = '16,000원';
    albumImage = Palette;
  }

  albumPrice = '20,000원'; //가격을 2만원으로 통일

  // 가격을 숫자로 변환
  const originalPrice = parseInt(albumPrice.replace(/[^0-9]/g, ''));

  const [showSaleAlert, setShowSaleAlert] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSaleAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handlePurchase = () => {
    setShowSaleAlert(true);
  };

  return (
    <div className="detail">
      <Grid container spacing={5} alignItems="flex-start">
        <Grid item>
          <img src={albumImage} alt={albumTitle} style={{ width: '100%' }} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div style={{ marginTop: '10px' }}>
            <h2 style={{ textAlign: 'left', marginBottom: '5px' }}>{albumTitle}</h2>
            <p style={{ textAlign: 'left', marginBottom: '5px' }}>{albumSubtitle}</p>
            <p style={{ textAlign: 'left', marginBottom: '5px' }}>
              Price: {showSaleAlert ? `${originalPrice * 0.7}원` : albumPrice}
            </p>
            <Button onClick={handlePurchase} disabled={showSaleAlert}>
              주문하기
            </Button>
            {showSaleAlert && (
              <Box sx={{ marginTop: '10px' }}>
                <Alert
                  severity="warning"
                  onClose={() => setShowSaleAlert(false)}
                  sx={{ backgroundColor: 'lightorange', color: 'black' }}
                >
                  3초 안에 구매하면 30% 세일 중! 가격: {originalPrice * 0.7}원
                </Alert>
              </Box>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Detail;
