# Git automation script to push changes to repo
echo "Starting git operations...";

git add *;
git commit -m "update $(date +%Y-%m-%d_%H)";
git push;