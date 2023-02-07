FROM node:18-alpine
RUN mkdir /usr/app
USER node
WORKDIR /usr/app
EXPOSE 3000
CMD [ "yarn", "next", "dev" ]