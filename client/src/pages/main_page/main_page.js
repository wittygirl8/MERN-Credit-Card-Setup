import React,{ useState } from 'react'
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import axios from 'axios';
import { useHistory } from "react-router-dom"
//Importing css file.
import './main_page.css';

const Main_Page = () => {
    const history = useHistory();
    const [card_details, setcard_details] = useState({
        card_num:"",
        card_holder:"",
        exp_month:"",
        exp_year:"",
        cvc:""
    });
    const [focus, setfocus] = useState('');

    const [card_numError, setcard_numError] = useState('');
    const [card_holderError, setcard_holderError] = useState('');
    const [exp_monthError, setexp_monthError] = useState('');
    const [exp_yearError, setexp_yearError] = useState('');
    const [cvcError, setcvcError] = useState('');
    
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        // console.log({...card_details});
        setcard_details({ ...card_details, [name]: value});
    }
    const expire = [ card_details.exp_month, card_details.exp_year];

    const PostData = async (e) => {
        e.preventDefault();
        
        //Object Destructuring
        const { 
            card_num,
            card_holder,
            exp_month,
            exp_year,
            cvc
        } = card_details;
            console.log("--", card_details)

        if(exp_year!=='')
            setexp_yearError('');
        else{
            setexp_yearError('**Required');
        }

        if(cvc!=='')
            setcvcError('');
        else{
            setcvcError('**Required');
        }

        if(card_num!=='')
            setcard_numError('');
        else{
            setcard_numError('**Required');
        }

        if(card_holder!=='')
            setcard_holderError('');
        else{
            setcard_holderError('**Required');
        }

        if(exp_month!=='')
            setexp_monthError('');
        else{
            setexp_monthError('**Required');
        }
        let response;
        if(card_num && card_holder && exp_month && exp_year && cvc)
        {
            response = axios.post("http://localhost:4000/register", 
            {"card_number":card_num,
            "holder_name":card_holder,
            "exp_month":exp_month,
            "exp_year":exp_year,
            "cvv":cvc}).then(res=> console.log(res))
        }
        else{
            console.log('Invalid!!');
        }
        console.log(response)
        if(response.status === 200) {
            alert('Card Registered Successfully');
            history.push("/thank-you");
        }
        else if(response.status === 404){
            alert('Card Already Registered');
        }
    }
    return (
        <>
        <div className="fullBackground">
            <Cards
                number = {card_details.card_num}
                name = {card_details.card_holder}
                expiry = {expire.join('/')}
                cvc = {card_details.cvc}
                focused = {focus}
            />
            <div className="CardDetails">
                <section className="register">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-sm-12 col-md-12">
                            <form method="POST" class="register-card" id="register-card"> 
                                <div className='form-col'>
                                    <div><label>Card Number</label></div>
                                    <input type='text' onChange={handleInputs} onFocus={e => setfocus(e.target.name)} className='form-control' autoComplete='off' value={card_details.card_num} name='card_num' id='cad_name'/>
                                    {card_numError&&<div className="err-msg">{card_numError}</div>}
                                </div>
                                <div className='form-col'>
                                    <div><label>Card Holders</label></div>
                                    <input type='text' onChange={handleInputs} onFocus={e => setfocus(e.target.name)} className='form-control' autoComplete='off' value={card_details.card_holder} name='card_holder' id='card_holder'/>
                                    {card_holderError&&<div className="err-msg">{card_holderError}</div>}
                                </div>
                            </form>
                        </div>
                        <div class="col-lg-4 col-sm-12 col-md-4">
                            <label for="exp_month">Expiration Date</label>
                            <select id="exp_month" class="form-control" onChange={handleInputs} onFocus={e => setfocus(e.target.name)}  name='exp_month'>
                                <option>Month</option>
                                <option  value='01'>01</option>
                                <option  value='02'>02</option>
                                <option  value='03'>03</option>
                                <option  value='04'>04</option>
                                <option  value='05'>05</option>
                                <option  value='06'>06</option>
                                <option  value='07'>07</option>
                                <option  value='08'>08</option>
                                <option  value='09'>09</option>
                                <option  value='10'>10</option>
                                <option  value='11'>11</option>
                                <option  value='12'>12</option>                                
                            </select>
                            {exp_monthError&&<div className="err-msg">{exp_monthError}</div>}
                        </div>
                        <div class="col-lg-4 col-sm-12 col-md-4">
                            <label for="exp_year" style={{color:'white'}}>Exp_YEAR</label>
                            <select id="exp_year" class="form-control" onChange={handleInputs} onFocus={e => setfocus(e.target.name)} name='exp_year'>
                                <option selected>Year</option>
                                <option>19</option>
                                <option>20</option>
                                <option>21</option>
                                <option>22</option>
                                <option>23</option>
                                <option>24</option>
                                <option>25</option>
                                <option>26</option>
                                <option>27</option>
                                <option>28</option>
                                <option>29</option>
                                <option>30</option>
                                <option>31</option>
                                <option>32</option>
                                <option>33</option>
                                <option>34</option>
                                <option>35</option>
                                <option>36</option>
                                <option>37</option>
                                <option>38</option>
                                <option>39</option>
                                <option>40</option>
                            </select>
                            {exp_yearError&&<div className="err-msg">{exp_yearError}</div>}
                        </div>
                        <div class="col-lg-4 col-sm-12 col-md-4">
                            <div className='form-col'>
                                <div><label>CVV</label></div>
                                <input type='text' className='form-control' autoComplete='off' value={card_details.cvc} onChange={handleInputs} onFocus={e => setfocus(e.target.name)} name='cvc' id='cvc'/>
                                {cvcError&&<div className="err-msg">{cvcError}</div>}
                            </div>
                        </div>
                        <div class="col-lg-12 col-sm-12 col-md-12">
                            <div>
                                    <input type='submit' className='sub_btn' value='SUBMIT' onClick={PostData} name='cvc' id='cvc'/>
                            </div>
                        </div>
                    </div>                    
                </div>
                </section>
            </div>
        </div>
        </>
    )
}
export default Main_Page;
