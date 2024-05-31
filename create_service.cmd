mkdir %1
cd %1

mkdir src 
cd src
mkdir config
mkdir services 
mkdir routes 
mkdir models 
mkdir controllers 
cd ..
cd > Dockerfile
cd > .gitignore

tsc --init & npm init -y


