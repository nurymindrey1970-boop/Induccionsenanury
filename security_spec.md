# Security Specification: SENA Inducción Pro

## Data Invariants
1. A QuizResult must be linked to a valid Apprentice document ID.
2. An Apprentice can only be created with a valid numeric documentId.
3. Timestamps (registeredAt, completedAt) must match request.time.
4. Score cannot exceed the total number of questions.

## The "Dirty Dozen" Payloads (Denial Examples)
1. Creating an Apprentice with an extremely long name (1MB string).
2. Updating someone else's Apprentice profile.
3. Creating a QuizResult without a valid apprenticeId reference.
4. Setting a negative score in a QuizResult.
5. Spoofing the registration date (setting it to 2020).
6. Injecting shadow fields into the Apprentice document (e.g., `isAdmin: true`).
7. Modifying a QuizResult after it has been saved (Terminal state locking).
8. Reading the list of all results as a guest.
9. Deleting an Apprentice profile.
10. Using a document ID for Apprentice that contains non-alphanumeric characters.
11. Creating a QuizResult with a score higher than the number of questions.
12. Attempting to update the `documentId` of an Apprentice after creation (Immutability).

## Firestore Rules
Drafted in `firestore.rules`.
