import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'black', padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <div>
          <h3 style={{ fontWeight : 'bolder', paddingBottom : 10}}>SUNU VOTE SN</h3>
          <p style={{ width : '60%', color : 'gray'}}>Une plateforme de vote sécurisée et innovante pour les élections présidentielles au Sénégal.</p>
        </div>
        
        <div>
          <h4>Contact</h4>
          <p style={{ fontSize : '1em'}}>support@sunuvote.sn</p>
          <p>+221 33 123 45 67</p>
        </div>
        <div style={{ paddingRight : 10, paddingLeft : 30}}>
          <h4 style={{ fontWeight : 'bolder'}}>Follow Us</h4>
          <div style={{ display: 'flex', gap: '2px', flexDirection: 'column'}}>
            <a href="#" aria-label="Facebook" style={{ color: 'white', textDecoration: 'none' }}>Facebook</a>
            <a href="#" aria-label="Instagram" style={{ color: 'white', textDecoration: 'none' }}>Instagram</a>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <p> 2024 SUNU VOTE SN &copy; All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
