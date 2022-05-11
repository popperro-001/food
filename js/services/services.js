const postData = async(url, data) => { //common function to handle fitch POST requests
    const result = await fetch(url, { //remember this is async code, error could be when result.json(), second when return, we need to use async before the function and await in the body of function
        method: "POST",
        headers: { //if we send JSON
            'Content-type': 'application/json'
        },
        body: data
    });

    return await result.json(); //proceed data to json and return as promise
};

const getResource = async(url) => { //common GET function to be reusable
    const result = await fetch(url);

    if (!result.ok) { //fetch does not handle 400 or 500 errors, so we need to handle it manually by catching the error
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
};

export {postData};
export {getResource};