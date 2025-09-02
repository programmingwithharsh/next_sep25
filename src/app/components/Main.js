'use client';
import React from 'react';
import AddProduct from './AddProduct';

export default class Main extends React.Component { // Export Main Component, inherit React class
    render() { // Class Component lifecycle
        return <div>This is Main Class Component
            <AddProduct />
        </div>
    }
}