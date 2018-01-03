import React, { Component } from 'react'
import styled from 'styled-components'
import { EDITOR } from '../../content.json'

export const Input = styled.input`
  display: block;
  border-radius: 2;
  width: 95%;
  margin: 7px;
  padding: 7px;
  background-color: #eeeeee;
`

export const Dropdown = ({ value, onChange }) => (
  <div className="field" style={{ flex: 1 }}>
    <div className="control">
      <div className="select">
        <select defaultValue={value} onChange={onChange}>
          {EDITOR.CATEGORIES.map(category => <option value={category}>{category}</option>)}
        </select>
      </div>
    </div>
  </div>
)
