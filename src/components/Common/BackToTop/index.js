import React, { useEffect } from 'react';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import "./styles.css"

function BackToTop() {
  const scrollFunction = () => {
    if (window.pageYOffset > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById('myBtn').style.display = 'flex';
    } else {
      document.getElementById('myBtn').style.display = 'none';
    }
  };

  const topFunction = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollFunction);
    return () => {
      window.removeEventListener('scroll', scrollFunction);
    };
  }, []);

  return (
    <div className="back-to-top-btn" id="myBtn" onClick={topFunction}>
      <ArrowUpwardRoundedIcon style={{ color: 'var(--blue)' }} />
    </div>
  );
}

export default BackToTop;