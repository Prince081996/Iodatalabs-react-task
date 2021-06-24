import React from "react";
import { render } from "@testing-library/react";
import SignUpForm from "../components/SignUp/SignUpForm";

describe("Signup render Page", () => {
  it("renders the Signup page", () => {
    const { getByText } = render(<SignUpForm />);
    expect(getByText(/Signup/i)).toBeInTheDocument();
  });

  it("renders a firstname input", () => {
    const { getByTestId } = render(<SignUpForm />);
    expect(getByTestId(/firstname/i)).toBeInTheDocument();
  });
  it("renders a lastname input", () => {
    const { getByTestId } = render(<SignUpForm />);
    expect(getByTestId(/lastname/i)).toBeInTheDocument();
  });
  it("renders a username input", () => {
    const { getByTestId } = render(<SignUpForm />);
    expect(getByTestId(/username/i)).toBeInTheDocument();
  });
  it("renders a password input", () => {
    const { getByTestId } = render(<SignUpForm />);
    expect(getByTestId(/password/i)).toBeInTheDocument();
  });
  it("renders a submit button", () => {
    const { getByText } = render(<SignUpForm />);
    expect(getByText(/Signup/i)).toBeInTheDocument();
  });
});
