echo "$WORKERS workers waiting $DELAY seconds before connecting to $frontendURL."
sleep $DELAY
npx playwright test --workers=$WORKERS
