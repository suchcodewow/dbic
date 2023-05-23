echo "Waiting $DELAY seconds before connecting to $frontendURL."
sleep $DELAY
npx playwright test --timeout $TIMEOUT --repeat-each $REPEAT --reporter=list --workers=$WORKERS --trace off
