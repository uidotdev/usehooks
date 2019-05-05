import React from 'react';

export default ({ value, onChange }) => (
   <div style={{ maxWidth: '300px', margin: '40px auto 0 auto' }}>
      <div className='control has-icons-left'>
         <input
            style={{ borderColor: '#078b61' }}
            className='input is-medium'
            type='text'
            placeholder='Search'
            value={value}
            onChange={e => onChange(e.target.value)}
         />
         <span className='icon is-small is-left'>
            <i className='fas fa-search' />
         </span>
      </div>
   </div>
);
