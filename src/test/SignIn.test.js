import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react';
import SignInForm from '../components/SignIn/SignInForm'
import  "@testing-library/jest-dom"
import { act } from 'react-dom/test-utils' 


describe("Login render Page", () => {
    it('renders the Login page', () => {
      const {getByText} = render(<SignInForm/>);
      expect(getByText(/Signin/i)).toBeInTheDocument();
    })

    it('renders a username input', () => {
        const {getByTestId} = render(<SignInForm/>);
        expect(getByTestId(/username/i)).toBeInTheDocument();
      });  

    it('renders a password input', () => {
        const {getByTestId} = render(<SignInForm/>);
        expect(getByTestId(/password/i)).toBeInTheDocument();
      }); 
      
      it('renders a submit button', () => {
        const {getByText} = render(<SignInForm/>);
        expect(getByText(/Signin/i)).toBeInTheDocument();
      });
    })


describe('user logs in successfully and token added to localstorage', () => {
  it('allows the user to login successfully', async () => {

    // mock window.fetch for the test
    const UserResponse = {token: null}

    jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(UserResponse),
      })
    });

    // Render the Login component
    const { getByTestId } = render(<SignInForm />);

    // fill out the form
    await act (async () => {
      fireEvent.change(screen.getByLabelText(/username/i), {
        target: {value: 'shaquille'},
      });

      fireEvent.change(screen.getByLabelText(/password/i), {
        target: {value: 'oatmeal'},
      })
    });

    //Submit the form
    await act (async () => {
      fireEvent.submit(getByTestId('form'))
    });

    // alert to show up before continuing with our assertions.
    // Expect alert to be success
    // Expect local token to be set
    expect(window.localStorage.getItem('value')).toEqual(UserResponse.token)
  })
});
