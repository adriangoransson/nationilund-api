FROM golang:1.11 as go-build
WORKDIR /go
COPY . /go
RUN go get -v -d .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=go-build /usr/local/go/lib/time/ /usr/local/go/lib/time/
COPY --from=go-build /go/app .
CMD ["./app"]
