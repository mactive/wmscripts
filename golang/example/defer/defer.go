package main

import (
	"fmt"
	"os"
)

func main() {
	f := createFile("./defer.txt")
	defer closeFile(f)
	writeFile(f)
}

func createFile(p string) *os.File {
	fmt.Println("createing")
	f, err := os.Create(p)
	if err != nil {
		panic(err)
	}
	return f
}

func writeFile(f *os.File) {
	fmt.Println("writing")
	fmt.Fprintf(f, "data")
}

func closeFile(f *os.File) {
	fmt.Println("closing")
	f.Close()
}
