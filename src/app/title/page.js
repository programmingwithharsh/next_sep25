"use client";
import bcrypt from 'bcryptjs'
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function Title() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const password = 'myPassword123'
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const category = searchParams.get("category") || "all";
    const sort = searchParams.get("sort") || "default";

    // useRef for uncontrolled components
    const nameRef = useRef(null);
    const emailRef = useRef(null);

    const updateFilter = (newCategory) => {
        debugger
        router.push(`/title?category=${newCategory}&sort=${sort}`);
    };

    return (
        <div className="p-6 space-y-4">
            <div>
                <h1>This is Title Functional Component</h1>
                <div>Original: {password}</div>
                <div>Hash: {hash}</div>
            </div>

            <h1 className="text-2xl font-bold">Products Page</h1>
            <p>Category: {category}</p>
            <p>Sort: {sort}</p>

            <div className="flex gap-2">
                <button
                    onClick={() => updateFilter("books")}
                    className="btn btn-outline-success m-2"
                >
                    Books
                </button>
                <button
                    onClick={() => updateFilter("electronics")}
                    className="btn btn-outline-danger"
                >
                    Electronics
                </button>
            </div>

            {/* Uncontrolled Component Example */}
            <div className="mt-4 p-4 border rounded">
                <h3>Uncontrolled Component Example</h3>
                <p>This form uses useRef to access input values (no state management):</p>

                <form onSubmit={(e) => {
                    e.preventDefault(); // stop page refresh
                    const name = nameRef.current.value;
                    const email = emailRef.current.value;
                    alert(`Name: ${name}, Email: ${email}`);
                }}>
                    <div className="mb-2">
                        <input
                            type="text"
                            ref={nameRef}
                            placeholder="Enter your name"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            type="email"
                            ref={emailRef}
                            placeholder="Enter your email"
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
