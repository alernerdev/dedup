# Article deduper for Knotch interview

## Problem
there are articles which are being pointed to by multiple urls -- therefore, a url cannot be used as the point of "uniqueness".  Populate a store with the list of articles while eliminating duplicate articles and aggregate the list of urls pointing at each article

## Approach
Hash each article content and use the hash as the key into the database.  If the article already exists, add to its list of urls. If it doesnt exist, add it for the first time.

## Implementation
- I am using MongoDB as the store, hosted at mlab.com
- Javascript
- Node/Express

## installation
npm install

## Testing/Running
- http://localhost:5000/db    -- returns a list of articles in the DB
- http://localhost:5000/db/delete -- clears the DB
- http://localhost:5000/db/stats -- returns insert/deduping stats
- http://localhost:5000/insert -- reads dummy data and inserts it into the database, one by one, verifying duplicate content as it goes.   Be sure to execute this method several times in sequence and observe that the number of dupes is growing while the number of inserts stays the same.

Thanks, let me know if something isn't working

alernerdev@gmail.com

Alex
