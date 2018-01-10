import React, { Component } from 'react'
import styled from 'styled-components'

export const Input = styled.input`
  display: block;
  border-radius: 2;
  width: 95%;
  margin: 7px;
  padding: 7px;
  background-color: #eeeeee;
`

export const Dropdown = ({ value, onChange, content }) => (
  <div className="field" style={{ flex: 1 }}>
    <div className="control">
      <div className="select">
        <select defaultValue={value} onChange={onChange}>
          {content.map(category => <option key={category} value={category}>{category}</option>)}
        </select>
      </div>
    </div>
  </div>
)
