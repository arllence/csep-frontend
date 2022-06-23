FROM node:12.16.2-alpine as build-step
#FROM trion/ng-cli:9.0.1
USER root
RUN mkdir /src
WORKDIR /src
COPY package.json ./
COPY . /src/
RUN npm install
RUN npm install ng-pick-datetime@7.0.0
RUN npm install typescript@3.8.2
RUN npm install ng2-material-dropdown@0.11.0
RUN npm install --save-exact --save terser@3.14
RUN npm update terser
RUN npm run build
FROM nginx:1.17.9-alpine as prod-stage
RUN rm -rf /home/*
COPY --from=build-step /src/dist/ /home/
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
# docker exec -it ngedmsfrontend sh
# docker exec -it nginxedmsfrontend sh
