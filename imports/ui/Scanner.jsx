import React from 'react';
//import Dynamsoft from 'dwt';

/*global Dynamsoft*/


export default Scanner = () => {

    const handleClick = () => {
        Dynamsoft.WebTwainEnv.ProductKey="BB5378854D6D60CF72FD5D6EB92FB925A9204E14C7E80A7E504E707255412B0E90042463C14F5EB3BF4060D7ABE5ED65F60419A097E8B9DF29DE644BB84E68AC6720F03518D5B8AE794DE04BB0E22FB5ABB2982DDA0E2D9CB0236A286977A11762C537F9CBC6F4F707C60E92";

    var dwObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');

    var bSelected = dwObject.SelectSource();

    if (bSelected) {
      var onAcquireImageSuccess = function() { dwObject.CloseSource(); };
      var onAcquireImageFailure = onAcquireImageSuccess;

      dwObject.OpenSource();
      dwObject.AcquireImage({}, onAcquireImageSuccess, onAcquireImageFailure);
    }
    }

    
    return (
        <div>
            <h1>Holi</h1>
        <button onClick={handleClick}>Scan Document</button>
        <div id="dwtcontrolContainer"></div>
      </div>
    );

}