const axios = require('axios');
const { DOMParser } = require('xmldom');

const apiKey = '579b464db66ec23bdd00000113d29184bc49473d79b07e25e9c209d4';
const apiUrl = 'https://api.data.gov.in/resource/fced6df9-a360-4e08-8ca0-f283fc74ce15';

const selectedState = 'Andhra Pradesh';
const selectedCity = 'ANANTAPUR';

const apiUrlWithFilters = `${apiUrl}?api-key=${apiKey}&format=xml&filters[state]=${selectedState}&filters[city]=${selectedCity}`;

axios.get(apiUrlWithFilters)
  .then(response => {
    const xmlData = response.data;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, 'text/xml');

    // Extract blood bank details
    const bloodBanks = xmlDoc.getElementsByTagName('item');
    for (let i = 0; i < bloodBanks.length; i++) {
      const bloodBank = bloodBanks[i];
      const bloodBankNameNode = bloodBank.getElementsByTagName('_blood_bank_name')[0];
      const stateNode = bloodBank.getElementsByTagName('_state')[0];
      const districtNode = bloodBank.getElementsByTagName('_district')[0];
      const cityNode = bloodBank.getElementsByTagName('_city')[0];
      const addressNode = bloodBank.getElementsByTagName('_address')[0];

      // Check if nodes exist before accessing their textContent
      if (bloodBankNameNode && stateNode && districtNode && cityNode && addressNode) {
        const bloodBankName = bloodBankNameNode.textContent;
        const state = stateNode.textContent;
        const district = districtNode.textContent;
        const city = cityNode.textContent;
        const address = addressNode.textContent;

        console.log(`Blood Bank Name: ${bloodBankName}`);
        console.log(`State: ${state}`);
        console.log(`District: ${district}`);
        console.log(`City: ${city}`);
        console.log(`Address: ${address}`);
        console.log('------------------------');
      }
    }
  })
  .catch(error => {
    if (error.response) {
        console.error('Error response:', error.response.status, error.response.statusText);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error:', error.message);
      }
  });