import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';

function IndexPage() {
  return (
    <div
      style={{
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
        textAlign: 'center',
      }}
    >
      <img
        src={require('../../assets/avatar.jpeg')}
        width={32}
      />
      Get start with it.
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
