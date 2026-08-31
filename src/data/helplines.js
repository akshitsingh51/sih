/**
 * Verified Indian Government Helpline Numbers
 * Sources: Ministry of Health, Ministry of WCD, ERSS, NCSC
 * Last verified: 2024
 */
const helplines = [
    {
      id: 'emergency',
      name: 'National Emergency',
      number: '112',
      purpose: 'Police, Fire, Ambulance, Disaster',
      availability: '24/7',
      source: 'Emergency Response Support System (ERSS)',
      category: 'emergency'
    },
    {
      id: 'police',
      name: 'Police',
      number: '100',
      purpose: 'Police assistance',
      availability: '24/7',
      source: 'Government of India',
      category: 'emergency'
    },
    {
      id: 'women',
      name: 'Women Helpline',
      number: '181',
      purpose: 'Emergency response, police, medical, counseling for women',
      availability: '24/7',
      source: 'Ministry of Women and Child Development',
      category: 'women'
    },
    {
      id: 'child',
      name: 'Child Helpline',
      number: '1098',
      purpose: 'Children in need of care and protection',
      availability: '24/7',
      source: 'Ministry of Women and Child Development',
      category: 'child'
    },
    {
      id: 'telemanas',
      name: 'Tele-MANAS',
      number: '14416',
      tollFree: '1800-891-4416',
      purpose: 'Mental health crisis support and counseling',
      availability: '24/7',
      source: 'Ministry of Health and Family Welfare',
      category: 'mental-health'
    },
    {
      id: 'kiran',
      name: 'KIRAN Mental Health',
      number: '1800-599-0019',
      purpose: 'Mental wellness and rehabilitation',
      availability: '24/7',
      source: 'Ministry of Social Justice and Empowerment',
      category: 'mental-health'
    },
    {
      id: 'scst',
      name: 'SC/ST Atrocities Helpline',
      number: '14566',
      tollFree: '1800-202-1989',
      purpose: 'Grievances under SC/ST (Prevention of Atrocities) Act',
      availability: '24/7',
      source: 'Ministry of Social Justice and Empowerment',
      category: 'sc-st'
    },
    {
      id: 'ncsc',
      name: 'National Commission for SC',
      number: '1800-118-888',
      purpose: 'Scheduled Caste welfare and grievances',
      availability: '24/7',
      source: 'National Commission for Scheduled Castes',
      category: 'sc-st'
    },
    {
      id: 'legal',
      name: 'Legal Aid',
      number: '15100',
      purpose: 'Free legal aid services',
      availability: 'Working hours',
      source: 'National Legal Services Authority',
      category: 'legal'
    }
  ];
  
  export default helplines;