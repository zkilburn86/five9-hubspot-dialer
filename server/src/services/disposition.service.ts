import express from 'express';
import passport from 'passport';
import axios, { AxiosPromise } from 'axios';

type Disposition = {
    id: string,
    label: string,
    deleted: boolean
}

module.exports = {
    getDispositions: (req, res) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err || !user) {
                res.status(404);
            } else {
                retrieveDispositions(user)
                .then(data => {
                    res.status(200).json(data);
                })
                .catch(err => console.error(err))
            }
        })(req, res);
        return;
    }
}

function retrieveDispositions (user) {
    const promise: AxiosPromise = axios.get('https://api.hubapi.com/calling/v1/dispositions', {
                    headers: {
                        'Authorization': 'Bearer ' + user.token,
                        'Accept': 'application/json'
                    }
    });
    const promiseData: Promise<[Disposition]> = promise.then((response) => response.data);
    return promiseData;
};