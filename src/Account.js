import React, { useState } from "react";
import './Style.css';
function Account(props) {
  var kk=[{category:'none',amount:'none',description:'none',title:'none',pic:'none'}];
  var [detail, setdetail] = useState(kk);
  var [i,seti]=useState(0);

  function erase(m)
  {
    fetch('http://localhost:2100/erase/'+m)
    .then((res)=> res.json())
    .then((hist)=>{
      console.log(hist)
      if(hist[0].campaign.length==0)
    {
      setdetail(kk);
    }
  else{
    seti(0);
    console.log(hist[0].campaign)
   setdetail(hist[0].campaign)
  }})
  }
  function submit_campaign(ev) {
    ev.preventDefault();
    var k1 = document.getElementsByName("option-category");
    console.log(k1[0].value);
    var k2 = document.getElementsByName("campaign");
    console.log(k2[0].value);

    var k = {
      name: props.u,
      campaign: {
        category: k1[0].value,
        title:k2[0].value,
        amount: k2[1].value,
        pic:k2[2].value,
        description: document.getElementById("des").value,
      },
    };

    fetch("http://localhost:2100/submitcampaign/", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(k),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Campaign registered')
        console.log(data);
      });
      ev.target.reset();
  }
  function slide(m)
  {
    if(m==1)
    {
      seti(++i);
    }
    else{
      seti(--i);
    }
  }
  function option_menu() {
    
    var k = document.querySelector("#option");
    k.style.display == "none"
      ? (k.style.display = "block")
      : (k.style.display = "none");
  }
  function history() {
    var h = document.getElementById("history");
    h.style.display = "block";
    document.querySelector('#campaign').style.display='none';
    var link = "http://localhost:2100/history/" + props.u;
    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data[0].campaign)
        
        if(data[0].campaign==0)
        {
          alert('Your history is empty');
          setdetail(kk)
        }
        else
        {
          setdetail(data[0].campaign)
        }
        
      });
  }
  return (
    <div>
      <div>
        {" "}
        <button className="btn btn-outline-light" id="option-button" onClick={option_menu}>
          <i className="bi bi-gear"></i>
          
        </button>
      </div>
      <div id='account-title'>
        <h2 style={{textAlign:'center'}}>Welcome {props.u}</h2>
      </div>

      <div id="option">
        <p
          onClick={() => {
            document.getElementById('history').style.display='none';

            document.querySelector("#campaign").style.display = "block";
          }}
        >
          Start Campaign
        </p>
        <p onClick={history}>History</p>
      </div>
      <div>
        <div id="campaign">
          <form onSubmit={(e)=>{submit_campaign(e)}}>
          <h3>Kick Start your campaign</h3>
          <table>
            <tr>
              <td>
                <label>Choose a category</label>
              </td>
              <td>
                <select name="option-category">
                  <option value="art">Art</option>
                  <option value="business">Business</option>
                  <option value="technology">Technology</option>
                  <option value="music">Music</option>
                  <option value="other">Other</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Title</td>
              <td><input type='text' name='campaign'/></td>
            </tr>
            <tr>
              <td>Target Amount</td>
              <td>
                <input type="text" name="campaign" />
              </td>
            </tr>
            <tr>
              <td>Campaign pic</td>
              <td><input type='text' name='campaign' placeholder='Enter URL' /></td>
            </tr>
          </table>
          <label style={{ marginBottom: ".5cm" }}>Provide a description</label>

          <div>
            <input type="text" id="des" />
          </div>
          <br/>
          <button>Submit</button>
          </form>
        </div>
      
      </div>
      <div id="history">
        <h3 style={{textAlign:'center'}}>Campaign History</h3>
        <div id='history-display'>
        <p>{(i>0)?<button onClick={()=>{slide(-1)}}>Pre</button>:''}</p>
              <div>{console.log(detail)}{console.log(i)}
                <p><img src={detail[i].pic}/></p>
                <p>Category : {detail[i].category}</p>
                <p>Title : {detail[i].title}</p>
                <p>Target amount :{detail[i].amount}</p>
                <p>Description :{detail[i].description}</p>
                <button onClick={()=>{erase(detail[i].title)}}>Delete</button>
              </div>
         <p>{(i<detail.length-1)?<button onClick={()=>{slide(1)}}>Next</button>:''}</p>
        </div>
      </div>
    </div>
  );
}
export default Account;
