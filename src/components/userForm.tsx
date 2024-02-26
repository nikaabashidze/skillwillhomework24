import React, { useState } from 'react';

interface UserFormProps {
    onFormSubmit: (firstname: string, lastname: string) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onFormSubmit }) => {
    const [firstname, setFirstname] = useState<string | undefined>();
    const [lastname, setLastname] = useState<string | undefined>();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (firstname && lastname) {
            onFormSubmit(firstname, lastname);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="firstname"
                onChange={(e) => setFirstname(e.target.value)}
            />

            <input
                type="text"
                placeholder="lastname"
                onChange={(e) => setLastname(e.target.value)}
            />

            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;

